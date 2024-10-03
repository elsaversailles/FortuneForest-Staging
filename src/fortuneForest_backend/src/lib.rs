use std::collections::HashMap;
use candid::{CandidType, Deserialize};
use ic_cdk::{query, update};
use std::cell::RefCell;

// Thread-local storage for users
thread_local! {
    static USERS: RefCell<HashMap<String, User>> = RefCell::new(HashMap::new());
}

#[derive(CandidType, Deserialize, Clone)]
struct User {
    email: String,
    password: String,
}

#[update]
fn create_user(email: String, password: String) {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        let user = User { email: email.clone(), password };
        users.insert(email, user);
    });
}

#[query]
fn get_user(email: String) -> Option<User> {
    USERS.with(|users| {
        let users = users.borrow();
        users.get(&email).cloned()
    })
}

#[update]
fn delete_user(email: String) {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        users.remove(&email);
    });
}

#[query]
fn get_all_users() -> Vec<User> {
    USERS.with(|users| {
        let users_map = users.borrow();
        let users_vec: Vec<User> = users_map
            .values()
            .cloned()  // Clone each user from the map
            .collect();
        users_vec
    })
}

#[update]
fn edit_user(old_email: String, new_email: Option<String>, new_password: Option<String>) -> Option<User> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();

        if let Some(user) = users.remove(&old_email) {
            let updated_user = User {
                email: new_email.clone().unwrap_or_else(|| user.email.clone()),
                password: new_password.clone().unwrap_or_else(|| user.password.clone()),
            };

            users.insert(updated_user.email.clone(), updated_user.clone());
            Some(updated_user)
        } else {
            None
        }
    })
}
