# Schema Builder User Interface  :speech_balloon:
- Created by **Michelle Zhang**, Fall 2020
- Advised by Shikib Mehri and Dr. Maxine Eskenazi 
- Project for [DialRC](http://dialrc.org/), Language Technologies Institute, Carnegie Mellon University

![Thumbnail](assets/thumbnail.png?raw=true "Title")

### Description 

Schema Builder is an application that allows users to build dialog schema, 
which are then passed into schema-guided models trained on the [STAR dataset](https://arxiv.org/pdf/2010.11853.pdf). 
The schema are used in conjunction with pre-existing model knowledge to facilitate generalizability and zero-shot transfer learning.
 
### Usage 

Users can drag and drop components and arrows to create a flowchart-style schema diagram and test their dialog implementation in real time by interacting with the system.

Basic functions:
 - **To edit a component:** right click on component
 - **To delete a component or arrow:** select and backspace

### Details

- The frontend uses React.js (JavaScript, HTML, and CSS).
- The backend API uses the Python Tornado framework.
- Some UI components for the chatbox (namely `Message, MessageList, Messenger, Toolbar`) are based on [React Messenger](https://github.com/sejr/react-messenger).

## Component Breakdown

| Component Name  | Function |
| ------------- | ------------- |
| DragDrop  |<ul><li>Contains buttons which allow users to create State, Action, & Query components</li><li>Controls ability to title the schema</li><li>Contains save button & error handling</li></ul>|
| Flow  | <ul><li>Contains workspace for building the dialog schema</li><li>Utilizes the [React Flow](https://reactflow.dev/) library</li></ul> |
| Message  | Controls the message properties |
| MessageList  | Controls list of messages displayed on the frontend |
| Messenger  | <ul><li>Ability to type and send messages to the chatbox</li><li>Auto refresh when schema is saved</li></ul> |
| SplitDisplay  | Split screen display (drag-drop area on left, messenger on right) |
| Modal  | Pop up which appears when a component is right clicked: allows user to edit node information |
| Toast | Notifications that appear when save button is clicked |
| Toolbar | Controls the properties for the toolbar above the message display area |

## Example Usage
![Example](assets/ExampleUsage.png?raw=true "Title")
![Example 2](assets/ExampleUsage2.png?raw=true "Title")

### Inquiries 
Please contact mwzhang@andrew.cmu.edu.
