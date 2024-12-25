import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  title = '';
  content = '';
  image: File | null = null;
  message = '';

  constructor(
    private readonly blogService: BlogService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    if (!this.authService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

  postBlog(): void {
    if (this.title && this.content) {
      const blog: Blog = {
        title: this.title,
        content: this.content,
        image: this.image ? URL.createObjectURL(this.image) : "",
        date: new Date(),
      };
      this.blogService.addBlog(blog);
      this.message = 'Blog posted successfully!';
      this.router.navigate(['/']);
    } else {
      this.message = 'Please provide a title and content.';
    }
  }
}
