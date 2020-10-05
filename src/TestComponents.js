import { BottomNavigation, Text } from 'react-native-paper';
import * as React from 'react';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const LinksRoute = () => <Text>Notifications</Text>;

const ProfileRoute = () => <Text>Profile</Text>;

const MyComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home', color: "#2a2a2a"},
        { key: 'search', title: 'Search', icon: 'image-search', color: "#2a2a2a"},
        { key: 'photos', title: 'Upload', icon: 'camera', color: "#2a2a2a"},
        { key: 'notification', title: 'Notifications', icon: 'link', color: "#2a2a2a"},
        { key: 'profil', title: 'Profil', icon: 'link', color: "#2a2a2a"},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: MusicRoute,
        search: AlbumsRoute,
        photos: RecentsRoute,
        notification: LinksRoute,
        profil: ProfileRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default MyComponent;
