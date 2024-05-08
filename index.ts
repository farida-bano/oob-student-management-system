#! /usr/bin/env node
import inquirer from "inquirer";
// Adjust import for TypeScript functions
import { isArrowFunction, isNamespaceExportDeclaration } from "typescript";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[]; // Fix type declaration
    balance: number;
    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize as an empty array
        this.balance = 100;
    }
    enrollCourse(course: string) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payFees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class StudentManager {
    students: Student[]; // Rename 'student' to 'students' for clarity
    constructor() {
        this.students = [];
    }
    addStudent(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enrollStudent(studentId: number, course: string) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course}`);
        }
    }
    viewStudentBalance(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    payStudentFees(studentId: number, amount: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    showStudentStatus(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    findStudent(studentId: number) {
        return this.students.find(std => std.id === studentId);
    }
}

async function main() {
    console.log("Welcome to 'Farida Bano - Student Management System'");
    console.log("*".repeat(40));

    let studentManager = new StudentManager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;

            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;

            case "View Student Balance":
                let viewBalanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                studentManager.viewStudentBalance(viewBalanceInput.studentId);
                break;

            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;

            case "Show Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a student ID"
                    }
                ]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;

            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}

// Start the program
main();
