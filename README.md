# Schema Builder User Interface
- Created by **Michelle Zhang**, Fall 2020
- Advised by Shikib Mehri and Maxine Eskenazi

### Description 

Schema Builder is an application that allows users to build dialog schema, 
which are then passed into schema-guided models trained on the [STAR dataset](https://arxiv.org/pdf/2010.11853.pdf). 
The schema will be used during modeling to facilitate generalizability and zero-shot transfer learning.
 
### Usage 

Users can drag and drop components and arrows to create a flowchart-style schema diagram and test their dialog implementation in real time by interacting with the system.

### Details

- The frontend uses React.js (JavaScript, HTML, and CSS).
- The backend API uses the Python Tornado framework.
- Some UI components for the chatbox (namely `Message, MessageList, Messenger, Toolbar`) are based on [React Messenger](https://github.com/sejr/react-messenger).

### Component Breakdown

