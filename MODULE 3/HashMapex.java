import java.util.HashMap;
import java.util.Scanner;

public class HashMapex {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter student ID and name:");
        while (true) {
            System.out.print("ID: ");
            String idInput = sc.nextLine();
            if (idInput.equals("done")) {
                break;
            }
            int id = Integer.parseInt(idInput);
            System.out.print("Name: ");
            String name = sc.nextLine();
            studentMap.put(id, name);
        }
        System.out.print("Enter ID to retrieve name: ");
        int retrieveId = sc.nextInt();
        String retrievedName = studentMap.get(retrieveId);
        System.out.println("Name: " + retrievedName);
    }
}
