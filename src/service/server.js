const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = 5000;
const iphoneData = require('./data');  

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/api/iphones', (req, res) => {
    console.log('Received a request for /api/iphones'); 

    const { searchQuery, selectedModel, sortOrder } = req.query;

    let filteredItems = iphoneData.filter(item => 
        item.title.toLowerCase().includes(searchQuery ? searchQuery.toLowerCase() : '')
    );

    
    if (selectedModel && selectedModel !== 'all') {
        filteredItems = filteredItems.filter(item => item.title.includes(selectedModel));
    }

    if (sortOrder === 'low-to-high') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
        filteredItems.sort((a, b) => b.price - a.price);
    }

    res.json(filteredItems);
});

app.get('/api/iphones/:id', (req, res) => {
    const { id } = req.params;
    const foundItem = iphoneData.find(item => item.id === id);
    if (foundItem) {
        res.json(foundItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
