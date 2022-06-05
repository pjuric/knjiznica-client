import { render, screen } from '@testing-library/react'
import Nav from './Nav'

test("renderiranje minimalno 5 navigacijskih linkova", () => {
    render(<Nav/>);
    const navigacijskiLinkovi = screen.getAllByRole("link");
    expect(navigacijskiLinkovi).toHaveLength(5)
})