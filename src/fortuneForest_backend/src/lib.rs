use std::collections::HashMap;
use candid::{CandidType, Deserialize};
use ic_cdk::{query, update};
use std::cell::RefCell;
use serde::Serialize;
use ic_cdk::storage;

#[derive(CandidType, Deserialize, Clone, Debug)]
struct Field {
    field_name: String,
    field_value: String,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
struct User {
    fields: HashMap<String, String>,
}

thread_local! {
    static USERS: RefCell<HashMap<String, User>> = RefCell::new(HashMap::new());
}

// Simple counter for generating unique user IDs
thread_local! {
    static USER_ID_COUNTER: RefCell<u64> = RefCell::new(0);
}

fn generate_unique_user_id() -> String {
    USER_ID_COUNTER.with(|counter| {
        let mut id = counter.borrow_mut();
        *id += 1;
        format!("user_{}", *id)
    })
}

#[update]
fn create_user(email: String, password: String) -> Option<String> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();

        // Debug print to see all users before creation
        ic_cdk::println!("All users before creation: {:?}", users);

        if users.values().any(|user| user.fields.get("email").as_deref() == Some(&email)) {
            return None; // User already exists
        }

        // Generate unique user_id
        let user_id = generate_unique_user_id();

        // Set tree_points and game_coins
        let tree_points = "0".to_string();
        let game_coins = "0".to_string();

        // Create user fields
        let mut fields = HashMap::new();
        fields.insert("email".to_string(), email.clone());
        fields.insert("password".to_string(), password);
        fields.insert("user_id".to_string(), user_id.clone());
        fields.insert("tree_points".to_string(), tree_points);
        fields.insert("game_coins".to_string(), game_coins);

        let user = User { fields };
        users.insert(user_id.clone(), user);

        ic_cdk::println!("User created: {:?}", users.get(&user_id));  // Debug print
        Some("User created".to_string())
    })
}

//for login page
#[query]
fn verify_user_login_credentials(email: String, password: String) -> Option<String> {
    USERS.with(|users| {
        let users = users.borrow();
        for (_, user) in users.iter() {
            if let Some(user_email) = user.fields.get("email") {
                if user_email == &email {
                    if let Some(user_password) = user.fields.get("password") {
                        if user_password == &password {
                            return Some(serde_json::to_string(&user.fields).expect("Failed to serialize user fields to JSON"));
                        }
                    }
                }
            }
        }
        None
    })
}

#[query]
fn get_user_by_id(user_id: String) -> Option<String> {
    USERS.with(|users| {
        let users = users.borrow();
        let user = users.get(&user_id)?;

        Some(serde_json::to_string(&user.fields).expect("Failed to serialize user fields to JSON"))
    })
}

#[query]
fn get_all_users() -> Vec<String> {
    USERS.with(|users| {
        let users_map = users.borrow();

        users_map.values().map(|user| {
            serde_json::to_string(&user.fields).expect("Failed to serialize user fields to JSON")
        }).collect()
    })
}

#[query]
fn get_user_details(user_id: String, field_name: String) -> Option<String> {
    USERS.with(|users| {
        let users = users.borrow();
        if let Some(user) = users.get(&user_id) {
            if let Some(field_value) = user.fields.get(&field_name) {
                return Some(field_value.clone());
            }
        }
        None
    })
}

#[update]
fn edit_user(user_id: String, new_fields: Vec<Field>) -> Option<String> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if let Some(user) = users.get_mut(&user_id) {
            for field in new_fields {
                user.fields.insert(field.field_name, field.field_value);  // Add or update fields
            }
            return Some("User updated".to_string());
        }
        None // User not found
    })
}

#[update]
fn delete_user(user_id: String) -> Option<String> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if users.remove(&user_id).is_some() {
            Some("User deleted".to_string())
        } else {
            None // User not found
        }
    })
}

/*
#[query]
fn testlang() -> Option<String> {
    return Some("testing lang".to_string());
}
*/
/**/
#[update]
fn save_users_to_stable_storage() {
    USERS.with(|users| {
        let users = users.borrow();
        let serialized_users = serde_json::to_string(&*users).expect("Unable to serialize users");
        storage::stable_save((serialized_users,)).expect("Unable to save to stable storage");
    });
}

#[update]
fn load_users_from_stable_storage() {
    let (serialized_users,): (String,) = storage::stable_restore().expect("Unable to restore from stable storage");
    let users: HashMap<String, User> = serde_json::from_str(&serialized_users).expect("Unable to deserialize users");

    USERS.with(|cell| {
        *cell.borrow_mut() = users;
    });
}
