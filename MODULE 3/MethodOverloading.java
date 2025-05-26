public class MethodOverloading {
    public static void main(String[] args) {
        System.out.println("Sum of two integers: " + add(6, 7));
        System.out.println("Sum of two doubles: " + add(1.5, 5.5));
        System.out.println("Sum of three integers: " + add(1, 2, 3));
    }
    public static int add(int a, int b) {
        return a + b;
    }
    public static double add(double a, double b) {
        return a + b;
    }
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
}
