function StudentsFactory(studentsArray, classRoom) {
       

    const addName = (newStudentName) => {
        studentsArray.push(newStudentName);
        
    }
    const deleteName = (oldStudentName) => {
        studentsArray.splice(studentsArray.indexOf(oldStudentName), 1);
        
    }
    const deleteAll = () => {
        studentsArray = []; 
    }
    const changeRoom = (newRoom) => {
        classRoom = newRoom;
    }
    const printAll = () => {
        return {
            studentsArray,
            classRoom
        };
    }
    
    return {
        addName,
        deleteName,
        deleteAll,
        changeRoom,
        printAll

    };
    
}


const studentObjOfFunctions = StudentsFactory(['niels', 'mads'], '3a');
console.log("initial array of students and the classroom", studentObjOfFunctions.printAll());
studentObjOfFunctions.addName('younes');
console.log("Array after adding a new students and the classroom", studentObjOfFunctions.printAll());
studentObjOfFunctions.addName('johny');
console.log("Array after adding another new student and the class", studentObjOfFunctions.printAll());
studentObjOfFunctions.deleteName('younes');
console.log("Array after deleting student 'younes'", studentObjOfFunctions.printAll());
studentObjOfFunctions.changeRoom('3b');
console.log("current array of students and the changed class", studentObjOfFunctions.printAll());
studentObjOfFunctions.deleteAll();
console.log("Show current students and the class", studentObjOfFunctions.printAll());

