package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AccountDAO {
    private String url = "jdbc:sqlite:school.db"; 

    
    public void transferMoney(int fromAccountId, int toAccountId, double amount) {
        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

        try (Connection connection = DriverManager.getConnection(url)) {
           
            connection.setAutoCommit(false);

            try (PreparedStatement debitStatement = connection.prepareStatement(debitSql);
                 PreparedStatement creditStatement = connection.prepareStatement(creditSql)) {

               
                debitStatement.setDouble(1, amount);
                debitStatement.setInt(2, fromAccountId);
                debitStatement.executeUpdate();

                
                creditStatement.setDouble(1, amount);
                creditStatement.setInt(2, toAccountId);
                creditStatement.executeUpdate();

                
                connection.commit();
                System.out.println("Transfer successful.");

            } catch (SQLException e) {
                
                connection.rollback();
                System.out.println("Transfer failed. Transaction rolled back.");
                e.printStackTrace();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
