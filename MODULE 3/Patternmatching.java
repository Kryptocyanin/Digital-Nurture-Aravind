public class Patternmatching {

    public static void main(String[] args) {
        // Test with different types of objects
        checkType(10);          
        checkType("Hello");     
        checkType(3.14);      
        checkType(true);       
        
    }

    public static void checkType(Object obj) {
        String typeMessage = switch (obj) {
            case Integer i -> "It's an Integer: " + i;
            case String s -> "It's a String: " + s;
            case Double d -> "It's a Double: " + d;
            case Boolean b -> "It's a Boolean: " + b;
            default -> "Unknown type";
        };
        System.out.println(typeMessage);
    }
}
