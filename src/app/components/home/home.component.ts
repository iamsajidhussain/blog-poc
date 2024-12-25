import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];
  isAuthenticated = false;

  constructor(private readonly router: Router) {
    this.checkAuthentication();
  }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    const blogsData = localStorage.getItem('blogs');
    this.blogs = blogsData ? JSON.parse(blogsData) : [];
  }

  checkAuthentication() {
    const user = localStorage.getItem('currentUser');
    this.isAuthenticated = !!user; // User is authenticated if 'currentUser' exists
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  goToBlogDetail(blog: Blog) {
    this.router.navigate(['/blog', blog.title], { state: { blog } });
  }
}
