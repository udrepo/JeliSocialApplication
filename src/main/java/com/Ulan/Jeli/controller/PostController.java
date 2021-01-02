package com.Ulan.Jeli.controller;

import com.Ulan.Jeli.DAO.AppUserDAO;
import com.Ulan.Jeli.DAO.PostRepository;
import com.Ulan.Jeli.DAO.UserRepository;
import com.Ulan.Jeli.DAO.UserRoleRepository;
import com.Ulan.Jeli.entity.AppUser;
import com.Ulan.Jeli.entity.Post;
import com.Ulan.Jeli.entity.UserRole;
import com.Ulan.Jeli.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<AppUser> getAllAppUser() { return userRepository.findAll(); }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteAppUser(@PathVariable Long userId) {
        return userRepository.findById(userId).map(AppUser -> {
            userRepository.delete(AppUser);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("User " + userId + " not found"));
    }


    @Autowired
    private UserRoleRepository userRoleRepository;

    @GetMapping("/users_roles")
    public List<UserRole> getAllUserRole() { return userRoleRepository.findAll(); }

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }


    @PostMapping("/posts")
    public Post createPost(@Valid @ModelAttribute Post post) {
        return postRepository.save(post);
    }

    @PutMapping("/posts/{postId}")
    public Post updatePost(@PathVariable Long postId, @Valid @RequestBody Post postRequest) {
        return postRepository.findById(postId).map(post -> {
            post.setTitle(postRequest.getTitle());
            post.setDescription(postRequest.getDescription());
            post.setContent(postRequest.getContent());
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }


    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        return postRepository.findById(postId).map(post -> {
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }

}
