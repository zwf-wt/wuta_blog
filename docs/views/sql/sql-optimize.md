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
##### 8. 一些其它的优化方法
###### 1. exist和in
>  如果主查询的数据集大，则使用in;如果子查询的数据集大，则使用exist
```sql
-- exist：将主查询的结果，放到子查询结果中进行条件校验，条件成立则保留，条件不成立则丢弃
-- select ... from table where exist (子查询)

-- in:
-- select ... from table where tid in (1, 3, 5);
```
###### 2. order by 优化
using filesort 有两种算法:双路排序、单路排序(根据I0的次数)
MySQL4.1之前 默认使用 双路排序;
MySQL4.1之后默认使用 单路排序 ;
注意:单路排序比双路排序会占用更多的buffer。
单路排序在使用时，如果数据大，可以考虑调大buffer的容量大小: `set max_length_for_sort_data = 2048;`
如果max length for_sort data值太低，则mysq1会自动从 单路->双路(太低:需要排序的列的总长度大于max_length_for_sort_data )

提高`orderby`查询的策略:
a. 选择使用单路、双路，调整buffer的容量大小
b. 避免select *
c. 复合索引不要跨列使用, 避免usingc filesort
d. 保证全部的排序字段 排序的一致性(都是升序或降序)

##### 9. 慢查询日志
> MySql 提供的一种日志记录，用于记录MySql中响应时间超过阈值的sql语句，怛查询日志默认是关闭的。

> 检查是否开启了慢查询日志：`show variables like '%slow_query_log%';`

> 临时开启：
```sql
  set global slow_query_log = 1; -- 开启慢查询日志
  exit
  service mysql restart
```

> 永久开启：
```sql
-- /etc/my.cnf 中追加配置：
-- vi /etc/my.cnf
[mysqld]
slow_query_log = 1
slow_query_log_file = /var/lib/mysql/mysql-slow.log
```

> 慢查询日志的阈值：`show variables like '%long_query_time%';`

> 临时设置阈值：`set global long_query_time = 5;`, 单位是秒，设置完毕后，重新登陆后起效(不需要重启服务)

> 永久设置阈值：
```sql
-- /etc/my.cnf 中追加配置：
-- vi /etc/my.cnf
[mysqld]
long_query_time = 5
```

> 查看慢sql
1. 慢查询的sql被记录在了日志中，因此可以通过日志查看具体的慢sql
```sql
-- cat /var/lib/mysql/mysql-slow.log
```
2. 通过mysqldumpslow工具查看慢sql, 可能通过一些过滤条件，快速查找出需要定位的慢sql
```sql
-- mysqldumpslow --help
-- s：排序方式
-- r：逆序
-- l：锁定时间
-- g：正则匹配模式

-- 获取返回记录最多的3个SQL
  mysqldumpslow -s -r -t 3 /var/lib/mysql/mysql-slow.log
-- 获取访问次数最多的3个SQL
  mysqldumpslow -s c -t 3 /var/lib/mysql/mysql-slow.log
-- 按照时间排序，前10条包含left ioin查询语句的SQL
  mysqldumpslow -s t -t 10 -g "left join" /var/lib/mysql/mysql-slow.log

-- 语法：mysqldumpslow [options...] [log_file ...]
-- 语法：mysqldumpslow [各种参数] [慢查询日志的文件]

-- 如果报错：You have an error in your sql syntax, 说明sql 语句语法有错，需要修改sql语句

-- 如果报错：This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable), 则需要修改配置文件：是因为存储过程/存储函数在创建时与之前的开启慢查询日志冲突了
-- 解决冲突
--     临时解决(开启 log_bin_trust_function_creators)
show variables like '%log_bin_trust_function_creators%';
set global log_bin_trust_function_creators = 1;
-- 永久解决
-- /etc/my.cnf
-- log_bin_trust_function_creators = 1
```
#### 分析海量数据
##### profiles
```sql
show profiles; -- 默认关闭
show variables like '%profiling%'; -- 查看是否开启

set profiling = on; -- 开启
-- show profiles: 会记录所有profiling打开之后的全部sql查询语句所花费的时间。缺点：不够精确,只能看到 总共消费的时间，不能看到各个硬件消费的时间I
```
##### 精确分析：sql 诊断
```sql
-- show profile all for query 上一个查询的query id
-- show profile cpu,block io for query 上一个查询的query id
```
##### 全局查询日志
> 记录开启之后的全部sql语句(这次全局的记录操作仅仅在调优、开发过程中打开)
```sql
show variables like '%general_log%'; -- 查看是否开启

-- 执行的所有sql 记录在表中
set global general_log = 1; -- 开启全局日志
set global log_output='table'; -- 设置输出方式为表 将全部的sql记录在表中
-- 开启后，会记录所有sql, 会被记录在 mysql.general_log表中，
-- select * from mysql.general_log;

-- 执行的所有sql 记录在文件中
set global log_output='file'; -- 设置输出方式为文件
set global general_log = on; -- 开启全局日志
set global general_log_file='/tmp/mysql.log'; -- 设置日志文件路径
```

## 锁机制
> 解决因资源共享而造成的并发问题
> 操作类型分类：
1. 读锁(共享锁): 对同一个数据(衣服)，多个读操作可以同时进行，互不干扰
2. 写锁(互斥锁、排它锁): 如果当前写操作没有完成，则无法进行其他的读操作和写操作(读锁、写锁)

> 操作范围分类：
1. 表锁: 一次性对一张表整体加锁。如MyISAM存储引擎使用表锁，开销小、加锁快、无死锁；但锁的范围大，容易发生锁冲突、并发度低
2. 行锁：一次性对一条数据加锁。如InnoDB存储引擎使用行锁，开销大、加锁慢、容易出现死锁，不易发生锁冲突，并发度高
3. 页锁
```sql
-- 增加锁
-- locak table 表名1 read/write, 表名2 read/write ...;

-- 查看加锁的表：
-- show open tables;

-- 释放锁
unlock tables;


-- 加读锁
lock table tablelock read;


-- 会话：session, 每一个访问数据的dos命令行、数据库客户端工具都是一个会话

-- 会话0：
lock table tablelock read;
select * from tablelock; -- 可以查询 读(查)
delete from tablelock where id = 1; -- 写(增删改) 会等待， 不可以，报错

select * from emp; -- 读，不可以
delete from tablelock where eno = 1; -- 写，不可以
-- 如果某一个会话，对A表加了read锁，则该会话可以对A表进行读操作、不能进行写操作
-- 且该会话不能对其他表进行读、写操作
-- 即如果给A表加了read锁，则当前会话只能对A表进行读操作

-- 会话1：
select * from tablelock; -- 可以查询 读(查)
delete from tablelock where id = 1; -- 写(增删改) 会等待会话0将锁释放， 不可以，报错

select * from emp; -- 读，可以
delete from emp where eno = 1; -- 写，可以
-- 会话0给A表加了锁，其他会话的操作
-- 1. 可以对其他表(A表以外的表)进行读、写操作
-- 2. 对A表：读-可以，写-等待会话0释放锁，不可以



-- 加写锁
-- 会话0：
lock table tablelock write;
-- 当前会话(会话0)可以对加了写锁的表进行任何操作(增删改查)；但是不能操作(增删改查)其他表
-- 其他会话：对会话0加写锁的表，可以进行增删改查操作的前提是：等待会话0释放锁
```

### MySql表级锁的锁模式
MyISAM在执行查询语句(select)前，会自动会涉及的所有表加读锁，在执行更新操作(DML)前，会自动给涉及的表加写锁。所以对MyISAM表的读操作，不会阻塞其他会话对同一表的读操作，但会阻塞对同一表的写操作。对MyISAM表进行操作，会有以下情况：
1. 对MyISAM表进行读操作(加读锁)，不会阻塞其他进程(会话)对同一表的读操作，但会阻塞对同一表的写操作。只有当读锁释放后，才会执行其它进程的写操作。
2. 对MyISAM表进行写操作(加写锁)，会阻塞其他进程(会话)对同一表的读操作和写操作。只有当写锁释放后，才会执行其它进程的读写操作。

## 分析表锁定
### 查看哪些表加了锁：
```sql
show open tables; -- 1: 代表被加了锁
```
### 分析表锁定的严重程度：
```sql
show status like 'table%';
-- Table_locks_immediate: 即可能获取到的锁数
-- Table_locks_waited: 需要等待的表锁数(如果该值越大，说明表锁越严重)

-- 一般建议： Table_locks_immediate / Table_locks_waited  > 5000, 建议采用InnoDB存储引擎, 否则采用MyISAM存储引擎
```
## 行锁
```sql
-- mysql 默认自动commit; oracle 默认手动commit;

set autocommit = 0; -- 关闭自动提交 (默认开启), 关闭后就相当于加了行锁

-- 会话0: 写操作 
insert into linelock values('a6')

-- 会话1: 写操作 同样的数据
update linelock set name = 'ax' where name = 'a6' 
-- 更新时发现此数据被加锁了，会等待其它会话释放锁，然后更新

-- 对行锁情况：
-- 1. 如果会话x对某条数据a进行DML操作(研究时：关闭了自动commit的情况下)，则其它会话必须等待会话x结束事务(commit/rollback)后，才能对数据a进行操作。
-- 2. 表锁是通过unlock tables: 释放锁，行锁是通过事务(commit/rollback)释放锁



-- 会话0：写操作
insert into linelock values(8, 'a8')
-- 会话1： 写操作， 不同的数据
update linelock set name = 'ax' where id = 5;
-- 行锁：一次锁一行数据，因此如果操作的是不同数据，则不干扰


```
### 行锁的注意事项
#### 如果没有索引，则行锁会转为表锁
```sql
show index from linelock;
alter table linelock add index idx_linelock_name(name);

-- 会话0：写操作
update linelock set name = 'ai' where name = '3'
commit;
-- 会话1：写操作
update linelock set name = 'aiX' where name = '4'
commit



-- 会话0：写操作
update linelock set name = 'ai' where name = 3
-- commit;
-- 会话1：写操作
update linelock set name = 'aiX' where name = 4
-- commit
-- 可以发现，数据被阻塞了(加锁)
-- 原因：如果索引类发生了类型转换，则索引失效。因此此次操作，会从行锁转为表锁
```
#### 行锁的一种特殊情况：间隙锁：值在范围内，但并不存在
```sql
-- 此时linelock表中 id为7的数据不存在
update linelock set name = 'x' where id < 1 and id < 9;
-- 即在id为1和9之间加锁，但并不存在id为7的数据, 则id为7的数据为间隙锁
-- 间隙锁：Mysql会自动给间隙加锁，防止其它会话插入数据，导致数据不一致
-- 所以，id为7的数据，被锁住了，其它会话无法插入id为7的数据

-- 行锁：如果有where，则实际加过的范围就是where后面的范围(不是实际的值)
```

### 行锁分析
```sql
show status like '%innodb_row_lock%'
-- Innodb_row_lock_current_waits: 当前等待锁的个数
-- Innodb_row_lock_time: 等待总时长, 从系统启动到现在一共等待的时间
-- Innodb_row_lock_time_avg: 平均等待时长。从系统启动到现在，平均等待的时间
-- Innodb_row_lock_time_max: 最大等待时长。从系统启动到现在，最长一次等待时间
-- Innodb_row_lock_waits: 等待次数。从系统启动到现在，一共等待的次数
```
### 查询行锁
> 如果仅仅是查询数据，会不会加锁呢？
```sql
-- set autocommit = 0;
-- start transaction;
-- begin;
select * from linelock where id = 2 for update;
-- 通过 for update 对query语句进行加锁。
```

### 行锁结论
InnoDB默认采用行锁
缺点：比表锁性能损耗大。
优点：并发能力强帖，效率高。
因此建议，高并发用InnoDB，低并发用MyISAM