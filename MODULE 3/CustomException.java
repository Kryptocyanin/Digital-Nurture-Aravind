import java.util.Scanner;

public class CustomException{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        try {
            if (age < 18) {
                throw new InvalidAgeException("Age must be 18 or older");
            }
            System.out.println("Access granted");
        } catch (InvalidAgeException e) {
            System.out.println("Access denied: " + e.getMessage());
        }
    }
}

