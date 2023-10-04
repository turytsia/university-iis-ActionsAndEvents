/**
 * This file contains class that implements user services.
 *
 * @author Oleksandr Turytsia (xturyt00)
 */
package com.project.actionsandevents.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
  
@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;
  
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findByLogin(login);
  
        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + login));
    }
    
    /**
     * Insert user to a database and hash his password
     * 
     * @param user User
     * @return Message
     */
    public String addUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        return "User Added Successfully";
    }
}
