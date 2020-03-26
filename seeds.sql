USE work_db;

INSERT INTO department (name)
VALUES ("Content")

INSERT INTO department (name)
VALUES ("Partner Developmet")

INSERT INTO department (name)
VALUES ("SEM")

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000.00, 101) 

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 110000.00, 201) 

INSERT INTO role (title, salary, department_id)
VALUES ("Junior PD Rep", 95000.00, 202)

INSERT INTO role (title, salary, department_id)
VALUES ("Content Manager", 60000.00, 102)  

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 90000.00, 301) 

INSERT INTO role (title, salary, department_id)
VALUES ("SEM Rep", 75000.00, 302) 

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Stephannie", "Cruz", , 101,)

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Nicholas", "Saraco", , 201,)

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Derek", "Mountain", , 301,)

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("Jasmine" "McCoy",)

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("Emma" "Olson",)

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("Tyler" "Price",)