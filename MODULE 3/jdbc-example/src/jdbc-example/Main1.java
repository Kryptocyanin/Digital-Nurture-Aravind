package com.example;

public class Main1 {
    public static void main(String[] args) {
         
        AccountDAO accountDAO = new AccountDAO();

        // Transfer money from Account A to Account B
         accountDAO.transferMoney(1, 2, 100.00);

        System.out.println("AccountDAO class not found. Please ensure it is implemented and imported correctly.");
    }
}
