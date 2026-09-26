import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/dashboard';

export default function UploadLostItems() {
    const form = useForm({
        item: '',
        description: '',
        location: '',
        date: '',
        status: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.post(store().url, {
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <>
            <Head title="Upload Lost Items" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900"
                >
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                        Upload Lost Item
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="item">Item</Label>
                            <Input
                                id="item"
                                value={form.data.item}
                                onChange={(e) => form.setData('item', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={form.data.location}
                                onChange={(e) => form.setData('location', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={form.data.date}
                                onChange={(e) => form.setData('date', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Input
                                id="status"
                                value={form.data.status}
                                onChange={(e) => form.setData('status', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={form.processing}>
                            Save item
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

UploadLostItems.layout = {
    breadcrumbs: [
        {
            title: 'Upload Lost Items',
            href: '/upload-lost-items',
        },
    ],
};
