# 迭代器模式

## 介绍
迭代器模式（Iterator Pattern）是设计模式中的一种行为型模式。它提供了一种方法来访问一个聚合对象的元素，而无需暴露这个对象的内部表示。迭代器模式允许客户端以一致的方式遍历集合，而不必关心底层的数据结构。它有助于实现不同的遍历方式，并且可以增加新的迭代子类，而不改变现有的代码。

## 迭代器模式通常包括以下几个部分：
- 迭代器接口（Iterator）：定义了访问和遍历集合的方法，如 next()、hasNext() 等。
- 具体迭代器（Concrete Iterator）：实现了迭代器接口，并跟踪当前的遍历位置。
- 聚合（Aggregate）：定义了一个方法来返回一个迭代器对象，可以是一个列表或其他类型的容器。
- 具体聚合（Concrete Aggregate）：实现了存储和管理对象集合的方法，并可以提供一个或多个创建迭代器的方法。

## 优点

- 它简化了聚合类。因为遍历逻辑是在迭代器中实现的，所以聚合类不需要担心这些逻辑。
- 它支持多种遍历聚合的方式。例如，你可以为一个列表提供正向和反向两种遍历方式。
- 它符合开放/封闭原则。可以在不修改现有代码的情况下增加新的迭代器。
```python
'''
当然，这里提供一个基于 Python 的简单迭代器模式案例，用于演示如何遍历一个书籍列表。我们将定义一个书籍集合类 (BookShelf) 和一个书籍迭代器类 (BookIterator)，这样可以不暴露书籍集合的内部结构，同时提供一种遍历书籍的方式。
'''
class Book:
    """书籍类"""
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return self.title

class BookShelf:
    """书籍架类，用于存放书籍集合"""
    def __init__(self):
        self.books = []  # 存储书籍的列表
        self.last = 0  # 记录最后插入的书籍的位置

    def append_book(self, book):
        """向书籍架中添加一本书籍"""
        self.books.append(book)
        self.last += 1

    def get_book_at(self, index):
        """根据索引获取书籍"""
        return self.books[index]

    def get_length(self):
        """获取书籍的数量"""
        return self.last

    def iterator(self):
        """返回一个迭代器实例"""
        return BookIterator(self)

class BookIterator:
    """书籍迭代器类，用于遍历书籍集合"""
    def __init__(self, book_shelf):
        self.book_shelf = book_shelf
        self.index = 0

    def has_next(self):
        """检查是否还有下一个书籍"""
        return self.index < self.book_shelf.get_length()

    def next(self):
        """返回下一个书籍"""
        if self.has_next():
            book = self.book_shelf.get_book_at(self.index)
            self.index += 1
            return book
        else:
            raise StopIteration()

# 使用示例
book_shelf = BookShelf()
book_shelf.append_book(Book("Python编程"))
book_shelf.append_book(Book("Java编程"))
book_shelf.append_book(Book("C++编程"))

iterator = book_shelf.iterator()
while iterator.has_next():
    book = iterator.next()
    print(book)
'''
在这个例子中
1. Book 类表示一个书籍对象，其中包含书籍的标题。
2. BookShelf 类代表一个书籍架，它包含一个书籍列表，并提供了添加书籍、获取特定位置的书籍以及获取书籍数量的方法。
3. BookShelf 类还提供了一个 iterator 方法，该方法返回一个 BookIterator 实例。
4. BookIterator 类实现了遍历书籍的功能。它包含一个 has_next 方法来判断是否有下一个书籍，以及一个 next 方法来返回下一个书籍。

通过这种方式，我们可以在不暴露书籍集合内部结构的情况下，通过迭代器来遍历书籍。这种方式提高了代码的灵活性和可维护性。
''''
```