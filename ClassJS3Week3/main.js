function StudentsFactory(studentsArray, classRoom) {
       

    const array_NameAdded = (newStudentName) => {
        studentsArray.push(newStudentName);
        return studentsArray;
    };
    const array_NameRemoved = (oldStudentName) => {
        studentsArray.splice(studentsArray.indexOf(oldStudentName), 1);
        return studentsArray;
    };
    const emptyArray = () => {
        const tempArray = studentsArray;
        return studentsArray = []; 
    };
    const changeRoom = (newRoom) => {
        return classRoom = newRoom;
    };
    const displayAll = () => {
        return {
            currentStudentsArray: studentsArray,
            currentClass: classRoom
        };
    };
    return {
        addName: array_NameAdded,
        deleteName: array_NameRemoved,
        emptyArray: emptyArray,
        changeRoom: changeRoom,
        printAll: displayAll

    };
    
};
const initialStudents = [ 'niels', 'mads' ];
const room = '3a';
const studentObjOfFunctions = StudentsFactory(initialStudents, room);
console.log("initial array of students and the classroom", studentObjOfFunctions.printAll());
console.log("Array after adding newstudent", studentObjOfFunctions.addName('younes'));
console.log("Array after adding another newstudent", studentObjOfFunctions.addName('johny'));
console.log("Array after deleting 'younes'", studentObjOfFunctions.deleteName('younes'));
console.log("Show current students and the class", studentObjOfFunctions.printAll());
console.log("changed classroom", studentObjOfFunctions.changeRoom('3b'));
console.log("Show current students and the changed class", studentObjOfFunctions.printAll());
console.log("delete all the students", studentObjOfFunctions.emptyArray());
console.log("Show current students and the class", studentObjOfFunctions.printAll());

