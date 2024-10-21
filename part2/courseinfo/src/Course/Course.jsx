import Content from "./Content"
import Header from "./Header"

const Course = ({course}) => {
    console.log(course)
    return (
        <>
        <Header course={course} />
        <Content parts={course.parts} /> 
        </>
    )

}

export default Course