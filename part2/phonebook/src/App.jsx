import { useState, useEffect } from 'react'
import connectionTools from "./services/connectionTools"
import './index.css'

const Display = (props) => {
	const persons = props.persons
	const search = props.search

	if (search === "") {
		return (
			<div>
				{persons.map((person, index) => (
					<li key={index}>{person.name} {person.number}  /  <DeleteButton id={person.id} >delete</DeleteButton> </li>
				))}
			</div>
		)
	}

	return (
		<div>
			{persons.filter((person) => person.name
				.toLowerCase().includes(search) === true)
				.map((person, index) => (
					<li key={index}>{person.name} {person.number}  /  <DeleteButton id={person.id}>delete</DeleteButton> </li>
				))}
		</div>
	)
}

const DeleteButton = (props) => {
	const id = props.id

	const deletePerson = () => {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			connectionTools
				.deletehook(id)
				.then(() => {
					console.log(`The ${id} is deleted`);
					// Update the persons state to reflect the deletion
					// setPersons(persons.filter(person => person.id !== id));
				})
				.catch(error => {
					console.log("Error during deletion:", error); // Handle any error from deletehook
				});


		}
	};

	return (
		<button onClick={deletePerson}>delete</button>
	)
}


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [notification, setNotification] = useState(null)


	useEffect(() => {
		console.log("called effect")
		connectionTools.gethhook()
			.then(data => {
				if (data) {
					console.log("Data fetched: ", data);
					setPersons(data);
				}
			})
			.catch(error => {
				console.log("Error fetching data:", error);
			});
	}, []);



	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}

	const handleSearchChange = (event) => {
		console.log(event.target.value)
		setNewSearch(event.target.value)
	}


	const addPerson = (event) => {
		event.preventDefault(); // Prevent page reload

		if (persons.filter((person) => person.name === newName).length > 0) {
			alert(`${newName} is already added to phonebook`)
		}
		else if (persons.filter((person) => person.number === newNumber).length > 0) {
			alert(`${newNumber} is already added to phonebook`)
		}
		else {
			const newPerson = { name: newName, number: newNumber };
			setPersons(persons.concat(newPerson)); // Add new person to persons array
			setNewName(''); // Clear input field

			// Post new person to server
			connectionTools.posthook({ newName, newNumber })
				.then(data => {
					if (data) {
						console.log("Data posted:", data)
						setNotification(`Added ${newName}`)
						setTimeout(() => {
							setNotification(null);
						}, 5000);
					}
				})
				.catch(error => {
					console.log("Error posting data:", error)
				});


		}

	};

	return (
		<div>
			<h1>Phonebook</h1>
			{notification && <div className="notification">{notification}</div>}
			<form>
				<div>
					filter shown with <input value={newSearch} onChange={handleSearchChange} />
				</div>
			</form>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{
					<Display persons={persons} search={newSearch} />
				}
			</ul>
		</div>
	);
};

export default App;