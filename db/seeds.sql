INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Administration");

INSERT INTO role  (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 2), 
("Software Engineer", 70000, 2), 
("Sales Lead", 500000, 1), 
("Salesperson", 150000, 1),
("Legal Team Lead", 200000, 4), 
("Lawyer", 100000, 4),
("Accountant", 75000, 3), 
("CEO", 1000000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 8), ("Mike", "Chan", 2, 1), 
("Ashley", "Rodriguez", 3, 8), ("Dev", "Patel", 4, 3),
("Kevin", "Tupik", 5, 8), ("Malia", "Brown", 6, 5),
("Alexa", "Villanueva", 7, 8), ("Arturo", "Martinez", 8, 8);