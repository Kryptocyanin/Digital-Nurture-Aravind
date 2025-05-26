import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            
            Class<?> clazz = Class.forName("ExampleClass");

            
            Method[] methods = clazz.getDeclaredMethods();

           
            for (Method method : methods) {
                System.out.println("Method: " + method.getName());
                Class<?>[] parameterTypes = method.getParameterTypes();
                for (Class<?> paramType : parameterTypes) {
                    System.out.println("Parameter: " + paramType.getName());
                }
            }

            
            Object instance = clazz.getDeclaredConstructor().newInstance();

            
            Method method = clazz.getMethod("exampleMethod", String.class);
            method.invoke(instance, "Hello, Reflection!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
