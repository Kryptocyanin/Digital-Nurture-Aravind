public class VirtualThreads {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < 100000; i++) {
            int threadNumber = i;
            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + threadNumber + " is running");
            });
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Time taken: " + (endTime - startTime) + " ms");
    }
}
