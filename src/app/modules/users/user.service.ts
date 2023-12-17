import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentToDB = async (password: string, studentData: TStudent) => {
  // if (await User.isUserExists(studentData.id)) {
  //   throw new Error();
  // }
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set manually genrated id
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData); // built-in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};
// const student = new Student(studentData); // create an instance

export const UserServices = {
  createStudentToDB,
};
