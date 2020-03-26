DROP DATABASE work_db;

CREATE DATABASE work_db;

CREATE TABLE department (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
)

CREATE TABLE role (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INT (10), 
    INDEX department_ind (department_id),
    CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT (10),
 INDEX role_ind (role_id),
 CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES role(id),
 manager_id INT (10),
 INDEX manager_ind (manager_id),
 CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(id)
);


