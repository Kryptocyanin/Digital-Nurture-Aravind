public class TypeCastingExample {
    public static void main(String[] args) {
        double myDouble = 3.14;
        int myInt = (int) myDouble;
        System.out.println("Double to Int: " + myInt);
        int duplicateInt = 10;
        double duplicateDouble = (double) duplicateInt;
        System.out.println("Int to Double: " + duplicateDouble);
    }
}
