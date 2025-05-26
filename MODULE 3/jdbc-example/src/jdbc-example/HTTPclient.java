import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpClient{
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://api.github.com"))
                        .build();
        
                try {
                    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
                    System.out.println("Status Code: " + response.statusCode());
                    System.out.println("Response Body: " + response.body());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        
            private static HttpClient newHttpClient() {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'newHttpClient'");
            }
}
