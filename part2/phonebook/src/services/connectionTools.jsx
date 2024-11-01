import axios from "axios";

const gethhook = () => {
    console.log("fetchhook activated")

    return axios
        .get("http://localhost:3001/persons")
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("error fetching data")
        })
}

const posthook = (props) => {
    console.log("posthook activated")

    const newPerson = { "name": props.newName, "number": props.newNumber }

    return axios
        .post("http://localhost:3001/persons", newPerson)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("error posting data")
        })
}


const deletehook = (id) => {
    console.log(id)

    return axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("error deleting data ", error)
        })
}


export default { gethhook, posthook, deletehook }