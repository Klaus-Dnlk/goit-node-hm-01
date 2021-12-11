const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')


const contactPath = path.join(__dirname, 'db', 'contacts.json')

const readContent = async () => {
    const content = await fs.readFile(contactPath, 'utf8')
    const result = JSON.parse(content)
    return result
}

const listContacts = async () => {
    return await readContent()
  }
  
const getContactById = async (contactId) => {
    const contacts = await readContent()
    const contact = contacts.find(e => e.id === contactId)
    return  contact
  }
  
const removeContact = async (contactId) => {
  const contacts = await readContent()
  const foundContact = contacts.find(e => e.id === contactId) 
  const filteredContacts = contacts.filter(e => e.id !== contactId)
    if(foundContact) {
      await fs.writeFile(contactPath, JSON.stringify(filteredContacts, null, 2))
      return filteredContacts
    } 
  }
  
  const addContact = async (name, email, phone) => {
    const contacts = await readContent()
    const newContact = { name, email, phone, id: crypto.randomUUID() }
    
    if(contacts.some(e => e.name === newContact.name || e.email === newContact.email || e.phone === newContact.phone)) {
      return
    } 
    contacts.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2),
    )
    return newContact
  }


  module.exports = {listContacts, getContactById, removeContact, addContact}