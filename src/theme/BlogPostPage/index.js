// SPDX-FileCopyrightText: 2025-2026 Contributors to the Factory-X project
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import PropTypes from 'prop-types';
import BlogPostPage from '@theme-original/BlogPostPage';

export default function BlogPostPageWrapper(props) {
  const { metadata } = props.content;
  const { title, description, date, authors, permalink, tags } = metadata;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    ...(description && { description }),
    datePublished: date,
    url: `https://factory-x-contributions.github.io${permalink}`,
    ...(authors?.length > 0 && {
      author: authors.map((author) => ({
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
        ...(author.imageURL && { image: author.imageURL }),
      })),
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Factory-X',
      url: 'https://factory-x.org',
      logo: 'https://factory-x.org/wp-content/uploads//factory-x-logo.svg',
    },
    ...(tags?.length > 0 && {
      keywords: tags.map((tag) => tag.label).join(', '),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostPage {...props} />
    </>
  );
}

BlogPostPageWrapper.propTypes = {
  content: PropTypes.shape({
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired,
      permalink: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          url: PropTypes.string,
          imageURL: PropTypes.string,
        })
      ),
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
        })
      ),
    }).isRequired,
  }).isRequired,
};
