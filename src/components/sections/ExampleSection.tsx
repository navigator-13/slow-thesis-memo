'use client';

import { SectionDivider } from '../SectionDivider';
import { WheatPopup } from '../WheatPopup';

/**
 * Example section demonstrating content structure
 * Copy this template to create your own sections
 */
export function ExampleSection() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Opening paragraph */}
      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        This is how you structure your essay content. Each paragraph should be wrapped in a <code>&lt;p&gt;</code> tag
        with the appropriate styling classes. The EB Garamond font will automatically apply,
        giving your text an elegant, literary feel.
      </p>

      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        You can add inline annotations using the wheat icon{' '}
        <WheatPopup content="This is a helpful side note that appears in a popup when clicked!" />
        {' '}to provide additional context without disrupting the main flow of your argument.
      </p>

      {/* Section divider for major topic shifts */}
      <SectionDivider />

      {/* Sub-heading (optional) */}
      <h2 className="text-2xl md:text-3xl text-[hsl(var(--gold-text))] italic mb-6 mt-8">
        A Subsection Heading
      </h2>

      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        Continue your argument here. Notice how the section divider above creates
        a natural break between different parts of your section.
      </p>

      {/* Blockquote example */}
      <blockquote className="border-l-2 border-[hsl(var(--gold-dark))] pl-6 italic text-gray-600 dark:text-gray-400 my-8">
        "You can include quotes like this, with a subtle gold border and italic styling
        that sets them apart from the main text."
      </blockquote>

      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        Use <em>italics for emphasis</em> when needed, but remember that EB Garamond
        already has a distinctive italic style that looks particularly elegant.
      </p>

      {/* Another divider */}
      <SectionDivider />

      {/* Lists can also be styled */}
      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-4">
        When you need to enumerate points:
      </p>

      <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2 mb-6 ml-4">
        <li>First key point with supporting details</li>
        <li>Second important observation</li>
        <li>Third element in your argument</li>
      </ul>

      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        For more complex annotations, you can include images{' '}
        <WheatPopup
          content="Images help illustrate complex concepts"
          imageUrl="https://placehold.co/300x200/2a2d3e/d4af37?text=Example+Image"
        />
        {' '}or even URL previews{' '}
        <WheatPopup
          content="Reference to external sources"
          urlPreview="https://example.com/related-article"
        />
        {' '}in your popups.
      </p>

      <SectionDivider />

      {/* Closing paragraph */}
      <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
        End your section with a strong conclusion or transition to the next topic.
        The "Next Section" button will automatically appear below, guiding readers
        through your essay.
      </p>
    </div>
  );
}
