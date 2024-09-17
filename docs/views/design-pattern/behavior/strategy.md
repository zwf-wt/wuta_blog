# 策略模式

## 介绍
策略模式（Strategy Pattern）是行为设计模式中的一种。它定义了一系列的算法，并将每一个算法封装起来，使它们可以相互替换。这一模式让算法独立于使用它的客户而变化。简而言之，策略模式允许在运行时选择算法或者策略，并且可以在不影响客户端的情况下改变这些策略。

## 基本结构
- 环境（Context）：它维护一个对 Strategy 对象的引用，通常会定义一个方法来设置这个引用。
- 策略接口（Strategy）：定义了一个公共接口，使得不同的策略可以替换使用。
- 具体策略（Concrete Strategies）：实现了策略接口中的方法，提供了具体的算法实现。

## 实现步骤
- 定义一个策略接口，声明所有支持的操作。
- 实现多个具体策略类，每个类提供一个具体的实现。
- 定义上下文或客户端类，它使用策略接口，并可以在运行时动态地改变所使用的具体策略。

## 适用业务场景
策略模式适用于那些在运行时可以根据不同条件选择不同算法或行为的业务场景。以下是几种典型的适用场景：

1. 算法选择：
- 当一个系统需要动态地选择不同的算法或处理规则时，可以使用策略模式来封装这些算法或规则，并在运行时根据条件选择使用哪一个。
- 例如，在一个电商应用中，根据用户的位置或购买历史，选择不同的促销策略或折扣计算方式。
2. 多状态处理：
- 在处理某些具有多种状态的对象时，如果每种状态的行为都不同，可以为每种状态定义一个策略对象，这样可以在状态改变时更换策略。
- 比如在一个游戏中，不同的游戏角色可能有不同的行动规则，可以根据角色类型动态地选择对应的行动策略。
3. 外部配置：
- 如果系统的某种行为需要由外部配置来决定，而不是硬编码到程序内部，那么可以使用策略模式来实现这种灵活性。
- 例如，一个数据处理模块可以有多种数据存储策略，如存入数据库、文件系统或云存储，可以通过配置文件指定采用哪种策略。
4. 插件化编程：
- 在开发插件化或模块化的软件时，可以将各种功能模块作为策略对象，允许用户根据需求安装或卸载不同的功能模块。
- 比如在开发一个图形编辑器时，可以为不同的图像处理效果（如滤镜、锐化等）定义不同的策略，用户可以选择安装哪些效果。
5. 行为参数化：
- 如果你需要参数化一些行为，即某些行为或算法可以根据输入参数的不同而有不同的实现方式，那么策略模式可以用来提供这种参数化的能力。
- 比如在设计一个搜索引擎时，可以根据搜索请求的类型（如全文搜索、标题搜索等）来选择不同的搜索算法。

总之，策略模式适用于那些需要根据不同条件选择不同行为的场景，特别是当这些行为以算法或规则的形式存在，并且可能会随着需求的变化而频繁地增加或修改时。使用策略模式可以帮助提高代码的灵活性和可维护性。

## 案例
1. 如何使用策略模式来选择不同的排序算法。
```java
/**
 * 我们将创建一个 SortStrategy 接口以及几个实现了该接口的具体策略类。
 * 然后，我们创建一个 SortContext 类来使用这些策略。
 */

// 首先，定义一个策略接口：
public interface SortStrategy {
  void sort(int[] array);
}

// 接着，实现具体的策略类：
public class BubbleSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Bubble Sort:");
        bubbleSort(array);
    }

    private void bubbleSort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap elements
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        printArray(array);
    }

    private void printArray(int[] array) {
        for (int value : array) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}

public class QuickSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Quick Sort:");
        quickSort(array, 0, array.length - 1);
    }

    private void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);

            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
        printArray(array);
    }

    private int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = (low - 1);
        for (int j = low; j <= high - 1; j++) {
            if (array[j] < pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        return i + 1;
    }

    private void printArray(int[] array) {
        for (int value : array) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}

// 接下来，创建一个上下文类来使用这些策略：
public class SortContext {
    private SortStrategy strategy;

    public SortContext(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeSort(int[] array) {
        strategy.sort(array);
    }
}

// 最后，在主类中测试这些策略：
public class Main {
    public static void main(String[] args) {
        int[] numbers = {8, 5, 2, 9, 5, 6, 3};

        // 创建上下文并设置策略
        SortContext context = new SortContext(new BubbleSortStrategy());
        context.executeSort(numbers); // 使用冒泡排序

        context.setStrategy(new QuickSortStrategy()); // 更改策略为快速排序
        context.executeSort(numbers); // 使用快速排序
    }
}

/**
 * 解释
 * 在这个示例中：
 * 1. SortStrategy 是一个接口，定义了 sort 方法。
 * 2. BubbleSortStrategy 和 QuickSortStrategy 分别实现了 SortStrategy 接口，并提供了具体的排序算法实现。
 * 3. SortContext 类负责与策略接口交互，并执行具体的排序操作。
 * 4. 在 Main 类中，我们创建了 SortContext 并设置了初始策略为冒泡排序，然后执行排序。之后，我们更改策略为快速排序，并再次执行排序。
 * 
 * 通过这种方式，我们可以轻松地在运行时切换不同的排序算法，而无需修改 SortContext 或者 Main 类的代码。这正是策略模式的优势所在。
 */
```