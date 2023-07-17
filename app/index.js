import { View } from 'react-native';
import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

const Home = () => {
    return (
        <Link href="/other" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
    );
};

export default Home;