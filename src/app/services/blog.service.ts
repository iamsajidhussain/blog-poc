import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly storageKey = 'blogs';

  addBlog(blog: Blog): void {
    const blogs = this.getBlogs();
    blogs.push(blog);
    localStorage.setItem(this.storageKey, JSON.stringify(blogs));
  }

  getBlogs(): Blog[] {
    const blogs = localStorage.getItem(this.storageKey);
    return blogs ? JSON.parse(blogs) : [];
  }
}
