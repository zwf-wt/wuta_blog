# 常用命令

## 1. 初始化项目
> 初始化一个Git仓库(git init)
```txt
git init
```

## 2. 提交相关
### 2.1 提交到暂存区
> git add `<file>`: 将某个文件添加到暂存区
```txt
git add 文件名
git add *
```
### 2.2 填写提交信息
> git commit：将暂存区的文件提交到本地仓库，并添加提交信息
```txt
git commit -m '信息': 
```
### 2.3 提交远程
> git push origin `<your_branch_name>:<remote_branch_name>`
- origin 表示你要将代码推送到的远程仓库的名称，也就是你最初克隆代码的那个远程仓库。
- `<your_branch_name>` 表示你本地分支的名称。
- `<remote_branch_name>` 表示你要将代码推送到远程仓库中的分支名称

**如果本地分支的名称和远程分支的名称相同，可以不写远程分支名称**
```txt
// 将本地master分支的内容提交到远程分支
git push origin master

// 将本地分支名为 feature_branch, 推送到远程主分支main
git push origin feature_branch:main
```
### 2.4 拉取
> git pull：拉取远程仓库的最新代码
```txt
git pull
```

## 3. 分支管理
### 3.1 创建分支
```txt
// 使用branch创建分支
git branch '开发分支'

// 使用switch创建分支
git switch '功能分支'

```

### 3.2 切换分支
```txt
// 切换分支
git checkout '开发分支'
git switch '开发分支'


// 使用 chceckout 创建并切换分支
git checkout -b '开发分支'
// 使用switch创建并切换分支
git switch -c '测试分支'

```

## 4. 合并分支
> 1. git merge `<branch name>`：将指定分支合并到当前分支
```txt
// 当前分支是 开发分支，要将 功能分支 合并到 开发分支
git merge '功能分支'
```
> 2. git rebase `<target_branch>`

git rebase 命令可以用于将一个分支的提交合并到另一个分支上，并保持提交历史的线性。

```txt
// 当前分支是 功能分支，要将 功能分支提交合并到开发分支
git rebase '开发分支'
// Git 将会按顺序逐个将 <feature_branch> 上的提交应用到 <target_branch> 上。如果在应用提交时发生冲突，Git 会提示你解决冲突。
git rebase --continue

// 如果需要中断 rebase 操作
git rebase --abort
```
## 其它
### 1. 查看历史提交记录
> git log：查看提交历史
```
git log --oneline
```
### 2. 克隆
> git clone `<repository url>`：克隆远程仓库到本地

> git clone -b `<branch_name> <remote_repository_url>`: 克隆远程仓库的指定分支
### 3. 将本地仓库与远程仓库关联
> git remote add origin `<repository url>`

### 4. 回退到指定的提交版本
> git reset `<commit>`

### 5. 将当前工作区的修改储存起来，以便后续恢复或者应用到其他分支上
> git stash