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

import com.project.actionsandevents.User.exceptions.UserNotFoundException;
import com.project.actionsandevents.User.requests.UserPatchRequest;

import java.util.List;
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

    /**
     * TODO
     * @param id
     * @return
     * @throws UserNotFoundException
     */
    public User getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        return user.get();
    }
    
    /**
     * TODO
     * @param id
     * @throws UserNotFoundException
     */
    public void deleteUserById(Long id) throws UserNotFoundException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new UserNotFoundException("User with ID " + id + " not found");
        }
    }

    /**
     * TODO
     * @param id
     * @param patchRequest
     * @return
     * @throws UserNotFoundException
     */
    public User patchUserById(Long id, UserPatchRequest patchRequest) throws UserNotFoundException {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        User existingUser = user.get();

        existingUser.setEmail(patchRequest.getEmail());
        existingUser.setFirstname(patchRequest.getFirstname());
        existingUser.setLastname(patchRequest.getLastname());
        existingUser.setPhone(patchRequest.getPhone());

        repository.save(existingUser);

        return existingUser;
    }

    /**
     * TODO
     * @return
     */
    public List<Long> getUserIds() {
        return repository.findAllIds();
    }
}
