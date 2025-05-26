package com.example;

public class Main {
    public static void main(String[] args) {
        StudentDAO studentDAO = new StudentDAO();

        // Insert a new student
        studentDAO.insertStudent("David", 23);

        // Update an existing student
        studentDAO.updateStudent(1, "Alice Smith", 21);
    }
}
