# 备忘录模式

## 介绍
备忘录模式（Memento Pattern）是行为设计模式中的一种，它用于捕获一个对象的内部状态，并在不破坏封装性的前提下，将这个状态存储起来，以便之后可以恢复到之前的状态。这种模式对于创建复杂的撤销机制非常有用，尤其是在编辑器或者游戏等需要历史记录功能的应用中。

以下是备忘录模式的基本结构：

- Originator（原始发件人）：负责创建一个备忘录来存储它的内部状态，在需要的时候使用备忘录恢复状态。
- Memento（备忘录）：存储发起人的内部状态，并防止发起人以外的对象访问备忘录内的状态。
- Caretaker（管理者）：负责保存备忘录，但不能对备忘录的内容进行操作或检查。

## 优缺点
备忘录模式（Memento Pattern）有其特定的应用场景和相应的优点与缺点。下面是这些方面的概述：

- 优点
1. 封装性好：备忘录模式使得对象的状态可以被外部保存，而无需暴露对象的内部细节给外部，这保持了良好的封装性。
2. 简化了原发器：原发器（Originator）不需要关心状态的存储细节，只需要请求备忘录对象来保存或恢复状态。
3. 实现撤销操作：备忘录模式非常适合于实现撤销（Undo）功能，因为可以存储多个状态并在需要时恢复。

- 缺点
1. 内存消耗：如果系统频繁地保存大量的状态信息，则可能会消耗大量的内存资源。
2. 管理复杂性：需要有一个管理备忘录的类（Caretaker），这增加了系统的复杂度。此外，如果备忘录数量很多，管理这些备忘录可能会变得复杂。
3. 潜在的空间开销：如果备忘录包含大量数据，那么每个备忘录都会占用一定的空间，特别是在需要存储大量备忘录的情况下。
4. 可能违反透明性：如果备忘录模式使用不当，比如允许外部对象直接修改备忘录，可能会导致系统的不透明性和难以维护。

总的来说，备忘录模式是一个有用的模式，特别是当需要在不破坏封装性的情况下保存和恢复对象状态时。然而，在选择使用该模式之前，应考虑上述提到的潜在缺点，并确保它适合你的具体应用场景。

## 案例
```python
# 个简单的备忘录模式示例代码。这个例子展示了一个简单的文本编辑器，它可以保存和恢复文本内容
class Memento:
    """
    备忘录类，用于存储 Originator 对象的状态。
    """
    def __init__(self, state):
        self._state = state

    @property
    def state(self):
        return self._state


class Editor:
    """
    原始发件人（Originator）类，负责创建备忘录来存储当前状态，
    并且可以在需要时使用备忘录恢复状态。
    """
    def __init__(self):
        self._content = ""

    @property
    def content(self):
        return self._content

    @content.setter
    def content(self, new_content):
        self._content = new_content

    def create_memento(self):
        """
        创建备忘录并返回它。
        """
        return Memento(self._content)

    def restore_memento(self, memento):
        """
        使用备忘录恢复之前的状态。
        """
        self._content = memento.state


class Caretaker:
    """
    管理者类，用于保存备忘录。
    """
    def __init__(self):
        self._mementos = []
        self._index = -1

    def backup(self, editor):
        """
        保存 Editor 当前的状态。
        """
        if self._index < len(self._mementos) - 1:
            self._mementos = self._mementos[:self._index + 1]
        self._index += 1
        self._mementos.insert(self._index, editor.create_memento())

    def undo(self, editor):
        """
        撤销到上一个状态。
        """
        if self._index > 0:
            self._index -= 1
            editor.restore_memento(self._mementos[self._index])

    def redo(self, editor):
        """
        重做到下一个状态。
        """
        if self._index < len(self._mementos) - 1:
            self._index += 1
            editor.restore_memento(self._mementos[self._index])

# 使用示例
if __name__ == "__main__":
    editor = Editor()
    caretaker = Caretaker()

    editor.content = "Hello, "
    caretaker.backup(editor)
    print(f"Current content: {editor.content}")

    editor.content += "World!"
    caretaker.backup(editor)
    print(f"Current content: {editor.content}")

    # 撤销
    caretaker.undo(editor)
    print(f"Undo content: {editor.content}")

    # 重做
    caretaker.redo(editor)
    print(f"Redo content: {editor.content}")

'''
在这个例子中：

Editor 类作为原始发件人，负责创建备忘录和恢复备忘录。
Memento 类存储 Editor 的状态。
Caretaker 类负责保存和管理备忘录。
'''
```