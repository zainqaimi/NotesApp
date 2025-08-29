// src/screens/tabs/SettingsTab.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, List, SegmentedButtons } from 'react-native-paper';
import { useAppTheme } from '../../theme';
import { getCurrentUser } from '../../database/db';

type User = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
};

const SettingsTab: React.FC = () => {
  const { mode, setMode, colors } = useAppTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getCurrentUser();
      if (u) {
        setUser(u);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Avatar.Image
          size={72}
          source={{
            uri:
              user?.avatar ||
              'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(user?.name || 'User'),
          }}
        />
        <Text style={[styles.name, { color: colors.text }]}>
          {user?.name || 'Guest User'}
        </Text>
        <Text style={{ color: colors.text, opacity: 0.6 }}>
          {user?.email || 'No email'}
        </Text>
      </View>

      {/* Theme Toggle */}
      <List.Section>
        <List.Subheader style={{ color: colors.text }}>Theme</List.Subheader>
        <SegmentedButtons
          value={mode}
          onValueChange={val => setMode(val as any)}
          buttons={[
            { value: 'system', label: 'System' },
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default SettingsTab;
