import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject(){
        const response = await api.post('/projects',{
            title: `Novo Projeto mobile${Date.now()}`,
            owner: `Jhonatan Felipe`
        });
        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.title}>{project.title}</Text>
                    )}
                />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1"
        //justifyContent: "center",
        //alignItems: "center"
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
    }
})