public class OperatorPrecedence {
    public static void main(String[] args) {
        int result = 20 + 7* 2/ 4- 8 % 6;
        System.out.println("Result: " + result);
    }
}
//Multiplication>Division>Modulus>Addition>Subtraction
