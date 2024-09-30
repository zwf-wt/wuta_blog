# sql 优化

## 原理
MYSql 逻辑分层：连接层、服务层、引擎层、存储层

InnoDB(默认)：事务优化(适合高并发操作；行锁)
MyISAM：表锁(适合读多写少)

### 查询数据库引擎
1. 支持哪些引擎
```sql
show engines;
```

2. 当前数据库使用的引擎
```sql
show variables like '%storage_engine%';
```

3. 指定数据库对象的引擎：
```sql
CREATE TABLE tb(
  id int(4) auto_increment,
  name varchar(20),
  dept varchar(20),
  primary key(id)
) ENGINE=MYISAM AUTO INCREMENT = 1
  DEFAULT CHARSET=utf8;
```
## SQL优化
> 原因：性能低、执行时间长、等待时间长、sql语句欠佳(连接查询)、索引失效、服务器参数设置不合理(缓冲、线程数)

### sql 编写过程
```sql
-- 编写过程
select
  dinstinct
  ... from
  ... where
  ... group by ... having
  ... order by ... limit ...
```

```sql
-- 解析过程
select
  from
  ... on ...join ...where
  ... group by ... having
  ... select ... order by ... limit ...
```

### 索引
> sql优化，主要就是在优化索引，索引相当于书的目录，index 是帮助mysql 高效获取数据的数据结构，索引是数据结构(树：B树、Hash树... 默认B+树)。Btree一般都是指B+, 数据全部存放在叶节点中，B+树中查询任意的数据次数都是n次(B+树的高度)

> 索引的弊端：
1. 索引本身很大，可以存放在内存/硬盘(通常为硬盘)
2. 索引不是所有情况均适用: 
  a. 少量数据
  b. 频繁更新的字段
  c. 很少使用的字段 
3. 索引会降低增删改的效率(增删改 查)
> 优势
1. 提高查询速度(降低io使用率)
2. 降低cpu使用率(减少查询次数)
#### 索引分类
- 单值索引单列：age;一个表可以多个单值索引,name
- 主键索引:不能重复。id 不能是nu11
- 唯一索引: 不能重复。id 可以是nu11
- 复合索引：多个列构成的索引, 相当于 二级目录。(name,age)
#### 创建索引
> 注意:如果一个字段是primary key，则改字段默认就是 主键索引
##### 方式一
```sql
-- create 索引类型 索引名 on 表(字段)

-- 单值:
create index dept_index on tb(dept);
-- 唯一:
create unique index name_index on tb(name);
-- 复合索引
create index dept_name_index on tb(dept,name);

```
##### 方式二:
```sql

-- alter table 表名 索引类型 索引名(字段)

-- 单值:
alter table tb add index dept_index(dept)

-- 唯一:
alter table tb add unique index name_index(name)

-- 复合索引
alter table tb add index dept_name_index(dept, name)
```
#### 删除索引
```sql
-- drop index 索引名 on 表名
drop index name_index on tb;
```

#### 查看索引
```sql
show index from 表名
```
### sql性能问题
分析sql的执行计划：explain, 可以模拟SQL优化器执行SQL语句，从而让开发人员知道自己编写的SQL状况
mysql查询优化会干扰我们的优化

#### 查询执行计划 explain + sql 语句
```sql
explain select * from tb;
-- id: select 查询的序列号，表示查询中执行select子句或操作表的顺序
-- select_type: 表示select的类型, 查询类型
-- table: 输出结果集的表
-- type: 表示MySQL在表中找到所需行的方式，或称为访问类型, 类型
-- possible_keys: 表示查询时，可能使用的索引。可能用到的索引，是一种预测，不准。如果 possible keyNULL，则说明没用索引
-- key: 实际使用的索引
-- key_len: 实际使用索引字段的长度
-- ref: 表之间的引用
-- rows: 通过索引查询到的数据量
-- Extra: 额外的信息
```

##### id
1. id相同: id值相同，从上往下顺序执行(查询表的顺序)。
  表的执行顺序: 因数量的个数改变而改变的原因:笛卡儿积。数据小的表 优先查询;
2. id值不同: id值越大越优先查询(本质:在嵌套子查询时，先查内层再查外)
3. id值有相同，又有不同: id值越大越优先; id值相同，从上往下顺序执行

##### select_type
1. PRIMARY: 包含子查询SQL中的 主查询(最外层)
2. SUBQUERY: 包含子查询SQL中的 子查询(非最外层)
3. simple: 简单查询(不包含子查询、union)
4. derived:衍生查询(使用到了临时表)
5. union: union查询中的第二个及后续的查询语句
6. union result: 告知开发人员，那些表之间存在union查询
```sql
-- a.在from子查询中只有一张表
explain select cr.cname from(select*from course where tid in(1,2)) cr;

-- b. 在from子查询中，如果有tablel union table2。则table1 就是derived, table2就是union
explain select cr.cname from(select*from course where tid=l union  select * form course where tid=2)
```
##### type 索引类型
性能从好到差: system > const > eq_ref > ref > range > index > all, 要对type进行优化的前提: 有索引。其中:`system, const`只是理想情况;实际能达到`ref>range`就不错了，`range`已经可以访问索引了，`index`和`all`就说明索引失效了。
1. system(忽略): 只有一条数据的系统表;或衍生表只有一条数据的主查询
2. const: 仅仅能査到一条数据的SQL,用于Primary key 或unique索引 (类型 与索引类型有关)
3. ref: 非唯一性索引，对于每个索引键的查询，返回匹配的所有行(0，多)
4. eq_ref: 唯一性索引:对于每个索引键的査询，返回匹配唯一行数据(有且只有1个，不能多 、不能0)
5. range: 检索指定范围的行，where后面是一个范围查询(between, >, <, >=, <=, in等, 有时in会失效),
6. index: 查询全部索引中数据
```sql
-- tid 是索引，只需要扫描索引表，不需要所有表中的所有数据
explain select tid from teacher;
```

7. all: 全表扫描，查询所有表中的所有数据
```sql
-- cid不是索引，需要全表所有，即需要所有表中的所有数据
explain select cid from course 
```
> 总结
1. system/const:结果只有一条数据
2. eq_ref:结果多条;但是每条数据是唯一的;
3. ref:结果多条;但是每条数据是是0或多条;

##### key_len 索引长度
作用:用于判断复合索引是否被完全使用，如果索引字段可以为Null, 则会使用1个字节来记录。
- utf-8: 一个字符3个字节
- gbk: 1个字符2个字节
- latin: 1个字符1个字节

##### ref: 指明当前表所参照的字段
##### rows: 被索引优化查询的数据个数(实际通过索引而查询到的数据个数)
##### Extra: 其他额外的执行说明信息
###### using filesort
> 性能消耗大；需要"额外"的一次排序(查询) 
对于单索引，如果排序和查找的是同一个字段，则不会出现using filesort;如果排序和查找不是同一个字段，则会出现using filesort。如果是复合索引，则只有查询条件中使用了复合索引的最左边部分时，才会出现using filesort。因此，复合索引要想避免出现using filesort的情况，则查询条件要按照复合索引建立时的顺序，从左到右使用复合索引中的所有字段。
避免 where 和 order by 按照复合索引的顺序使用，不要跨列或无序使用。
###### using temporary
> 性能消耗大;使用了临时表保存中间结果。一般出现在groupy by语句中
避免：查询那些列，就根据那些列 group by分组
###### using index
> 性能提升;索引覆盖(覆盖索引)，不需要回表查询数据，不读取原文件，只从索引文件中获取数据，

只要使用到的列，全部都在索引中，就是索引覆盖using index

如果用到了索引覆盖(using index)时，会对 possible_keys 和 key 有影响：如果没有where,则索引只出现在key中，如果有where,则索引出现在key和possible_keys中。

###### using where
> 需要回表查询
###### using index condition
> 查询的列不完全被索引覆盖，需要回表查询
```sql
-- 假设 age 是索引列，但查询语句 `
select age, name from tc where age = 20
-- 此语句必须回原表查Name, 因此不是索引覆盖

```

###### impossible where
> where子句的值总是false,不能获取任何数据
```sql
select * from teacher where a1 = 'x' and a1='y'


```
#### 多表索引优化
> 索引往哪张表加？
1. 小表驱动大表
2. 索引建立经常使用的字段上
```sql
-- 小表：10
-- 大表：300
-- 对于双层循环来说:一般建议 将数据小的循环 放外层;数据大的循环 放内层
-- 当编写 ...on t.cid = c.cid 时，将数据量小的表 放左边，即小表驱动大表
```
3. 复合索引不能使用不等于(!= 或者 <>)或 is null (is not null)，否则自身以及右侧所有全部失效

> sql 优化，是一种概率层面的优化。至于是否实际使用了这些优化，需要通过explain进行查看，才能确定。是否走了索引。因为mysql 优化器会分析走索引的行数和表的总行数，如果走索引的行数占表中总行数的比例很大，才会走索引，否则不会走索引，这也叫索引失效。

*一般情况下，对于左链接，给左表加索引；右连接，给右表加索引*

- 对于复合索引来说，如果左边失效，右侧全部失效

#### 避免索引失效的一些原则
##### 1. 不要跨列或无序使用(最佳左前缀)
##### 2. 尽量使用全索引匹配，把索引全部用上
##### 3. 不要在索引列上做任何操作(计算、函数、类型转换)，会导致索引失效而转向全表扫描
##### 4. 尽量使用索引覆盖`using index`(只访问索引的查询(索引列和查询列一致)，减少select * )
##### 5. like 尽量以"常量"开头，不要以通配符开头，否则索引失效
```sql
select * from teacher where name like '%x%' -- name索引失效
```
##### 6. 尽量不要使用类型转换(显示、隐式)，否则索引失效
```sql
select * from teacher where name = 'abc' 
select * from teacher where name = 123 -- 程序底层将 123 转换为 '123'，即进行了类型转换
```
##### 7. 尽量不要使用or, 否则索引失效
```sql
select * from teacher where name = '' or tcid > 1; -- 将 or 左侧的 name 索引失效
```