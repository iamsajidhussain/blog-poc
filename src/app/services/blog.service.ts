import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly storageKey = 'blogs';

  constructor() { }

  addBlog(blog: any): void {
    const blogs = this.getBlogs();
    blogs.push(blog);
    localStorage.setItem(this.storageKey, JSON.stringify(blogs));
  }

  getBlogs(): any[] {
    const blogs = localStorage.getItem(this.storageKey);
    return blogs ? JSON.parse(blogs) : [];
  }
}
