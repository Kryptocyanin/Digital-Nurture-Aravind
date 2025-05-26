import java.util.List;
import java.util.stream.Collectors;

public class Records {
    public static void main(String[] args) {
        record Person(String name, int age) {}
        List<Person> people = List.of(
                new Person("Max", 25),
                new Person("Vanderdussen", 18),
                new Person("Virat", 30)
        );
        List<Person> adults = people.stream()
                .filter(p -> p.age() >= 18)
                .collect(Collectors.toList());
        System.out.println("Adults: " + adults);
    }
}
