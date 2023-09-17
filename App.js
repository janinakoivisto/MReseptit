import {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TextInput
} from 'react-native';

export default function App() {

    const [recipes,
        setRecipes] = useState([]);
    const [search,
        setSearch] = useState('tomato');

    useEffect(() => {
        const fetchRecipes = async() => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
                const data = await response.json();

                setRecipes(data.meals);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipes();
    }, [search]);

    const renderItem = ({item}) => (
        <View style={styles.recipeItem}>
            <Image
                source={{
                uri: item.strMealThumb
            }}
                style={styles.recipeImage}/>
            <Text style={styles.recipeTitle}>{item.strMeal}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Search for an ingredient"
                value={search}
                onChangeText={(text) => setSearch(text)}/>
            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={(item) => item.idMeal}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    recipeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    recipeTitle: {
        fontSize: 16
    },
    search: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
});