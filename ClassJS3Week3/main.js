function StudentsFactory(studentsArray, classRoom) {
       

    const add = (newStudentName) => {
        studentsArray.push(newStudentName);
        
    };
    const deleteStudent = (oldStudentName) => {
        studentsArray.splice(studentsArray.indexOf(oldStudentName), 1);
        
    };
    const deleteAll = () => {
        studentsArray = []; 
    };
    const changeRoom = (newRoom) => {
        classRoom = newRoom;
    };
    const printAll = () => {
        if(studentsArray.length == 0) {
            return 'Zero students in ' + classRoom;
        } else {
            const stringOfStudentsArray = [studentsArray.slice(0, -1).join(', '), studentsArray.slice(-1)[0]].join(studentsArray.length < 2 ? '' : ' and ');
            return stringOfStudentsArray + ' from ' + classRoom;
        }
         
    }; 
        
    
    
    return {
        add,
        deleteStudent,
        deleteAll,
        changeRoom,
        printAll

    };
    
}


const students = StudentsFactory(['niels', 'mads'], '3a');
console.log("initial:-  ",  students.printAll());
students.add('younes');
console.log("Younes Added:- ", students.printAll());
students.add('johny');
console.log("Johny Added:- ", students.printAll());
students.deleteStudent('younes');
console.log("younes deleted:- ", students.printAll());
students.changeRoom('3b');
console.log("classRoom changed:- ", students.printAll());
students.deleteAll();
console.log("All students deleted:- ", students.printAll());

