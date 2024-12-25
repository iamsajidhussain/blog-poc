import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;

  ngOnInit(): void {
    const navigation = window.history.state;
    if (navigation?.blog) {
      this.blog = navigation.blog;
    }
  }

  goBack(): void {
    window.history.back();
  }
}

export interface Blog {
  title: string;
  image: string;
  description: string;
  date: Date;
  content: string;
}
