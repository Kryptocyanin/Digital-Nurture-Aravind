import java.util.concurrent.*;

public class ExecutorServiceExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);

       
        Future<Integer> future1 = executorService.submit(() -> {
            Thread.sleep(1000);
            return 10;
        });

        Future<Integer> future2 = executorService.submit(() -> {
            Thread.sleep(2000);
            return 20;
        });

        
        try {
            Integer result1 = future1.get();
            Integer result2 = future2.get();
            System.out.println("Result 1: " + result1);
            System.out.println("Result 2: " + result2);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executorService.shutdown();
    }
}
